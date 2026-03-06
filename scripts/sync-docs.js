const fs = require('fs');

try {
    const data = JSON.parse(fs.readFileSync('figma-data.json', 'utf8'));

    let buttonSetNode = null;
    function findNode(node) {
        if (node.type === 'COMPONENT_SET' && node.name === 'Buttons/Button') {
            buttonSetNode = node;
            return;
        }
        if (node.children) {
            for (const child of node.children) {
                findNode(child);
                if (buttonSetNode) return;
            }
        }
    }

    if (data && data.document) findNode(data.document);

    if (!buttonSetNode) {
        console.error('Buttons/Button component set not found.');
        process.exit(1);
    }

    const props = buttonSetNode.componentPropertyDefinitions;
    const hierarchies = props['Hierarchy'].variantOptions; // e.g., ["Primary", "Secondary", ...]
    const sizes = props['Size'].variantOptions;         // e.g., ["sm", "md", "lg", "xl"]

    // Generate MDX Content
    const mdxContent = `import { Callout, Tabs, Tab } from 'nextra/components'
import { ButtonPlayground } from './ButtonPlayground'
import { Button } from '../../components/Button'

# Button (버튼) - 🤖 Auto Synced from Figma

이 페이지는 **Figma API 연동 스크립트(\`sync-docs.js\`)**에 의해 피그마에 정의된 최신 Variant 속성을 읽어와 자동으로 생성되었습니다!

<Tabs items={['🎨 디자인 쇼케이스', '💻 개발 가이드']}>
  <Tab>
    ### Variants (종류/Hierarchy)
    피그마에서 가져온 Button Hierarchy 속성들입니다.
    
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '20px 0', flexWrap: 'wrap', padding: '24px', background: '#f8f9fa', borderRadius: '8px' }}>
      ${hierarchies.map(h => `<Button variant="${h.toLowerCase().replace(' ', '-')}">${h}</Button>`).join('\n      ')}
    </div>

    ### Sizes (크기)
    피그마에서 가져온 Button Size 속성들입니다.

    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '20px 0', padding: '24px', background: '#f8f9fa', borderRadius: '8px' }}>
      ${sizes.map(s => `<Button variant="primary" size="${s}">Size ${s.toUpperCase()}</Button>`).join('\n      ')}
    </div>

  </Tab>
  <Tab>
    <Callout emoji="💡">
      **Tip:** 코드를 직접 수정해보세요! 아래 화면에 실시간으로 반영됩니다.
    </Callout>

    <ButtonPlayground />
  </Tab>
</Tabs>
`;

    fs.writeFileSync('pages/components/button.mdx', mdxContent);
    console.log('✅ Successfully updated pages/components/button.mdx with live Figma Data!');

} catch (err) {
    console.error(err);
}

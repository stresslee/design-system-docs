#!/usr/bin/env node

/**
 * Solid 아이콘 SVG 파일들로부터 icons-solid-data.json을 자동 생성합니다.
 *
 * 사용법:
 *   1. Figma에서 Solid Icons 페이지의 아이콘들을 SVG로 export
 *      - 전체 선택 → Export → SVG 형식
 *   2. export된 SVG 파일들을 public/icons-solid/ 폴더에 넣기
 *   3. node scripts/generate-solid-icons-data.js 실행
 *
 * Line 아이콘의 카테고리 구조(icons-data.json)를 참고하여 매칭합니다.
 * 매칭되지 않는 아이콘은 "Uncategorized"로 분류됩니다.
 */

const fs = require('fs');
const path = require('path');

const SOLID_DIR = path.join(__dirname, '../public/icons-solid');
const LINE_DATA = path.join(__dirname, '../public/icons-data.json');
const OUTPUT = path.join(__dirname, '../public/icons-solid-data.json');

// Read line icons data for category mapping
let lineData = {};
try {
  lineData = JSON.parse(fs.readFileSync(LINE_DATA, 'utf8'));
} catch {
  console.log('⚠️  icons-data.json not found, all icons will be "Uncategorized"');
}

// Build name → category map from line icons
const nameToCategory = {};
for (const [category, icons] of Object.entries(lineData)) {
  for (const icon of icons) {
    nameToCategory[icon.name] = category;
  }
}

// Read solid SVG files
const files = fs.readdirSync(SOLID_DIR).filter(f => f.endsWith('.svg')).sort();

if (files.length === 0) {
  console.log('❌ No SVG files found in public/icons-solid/');
  console.log('   Figma에서 Solid 아이콘을 export 후 해당 폴더에 넣어주세요.');
  process.exit(1);
}

// Categorize
const result = {};
for (const file of files) {
  const name = file.replace('.svg', '');
  const category = nameToCategory[name] || 'Uncategorized';
  if (!result[category]) result[category] = [];
  result[category].push({
    name,
    file: `/icons-solid/${file}`,
  });
}

// Sort categories to match line icons order
const lineCategories = Object.keys(lineData);
const sorted = {};
for (const cat of lineCategories) {
  if (result[cat]) sorted[cat] = result[cat];
}
// Add any remaining categories
for (const cat of Object.keys(result)) {
  if (!sorted[cat]) sorted[cat] = result[cat];
}

fs.writeFileSync(OUTPUT, JSON.stringify(sorted, null, 2));

const totalIcons = Object.values(sorted).reduce((sum, arr) => sum + arr.length, 0);
console.log(`✅ icons-solid-data.json 생성 완료`);
console.log(`   ${Object.keys(sorted).length} categories, ${totalIcons} icons`);

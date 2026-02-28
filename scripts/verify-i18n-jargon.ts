#!/usr/bin/env bun
/**
 * i18n Verification for JargonText
 *
 * Verifies that Ukrainian (uk.ts) and English wizard messages have:
 * - Same structure (same keys at all levels)
 * - Compatible types (string→string, array→array, object→object)
 * - All prose strings for JargonText have translations
 *
 * Exit codes:
 * - 0: Verification passed, structure is compatible
 * - 1: Structural mismatch, missing translations, or type incompatibility
 */

import fs from 'fs';
import path from 'path';

const WEB_DIR = path.resolve(process.env.WEB_DIR || './apps/web');

console.log('🌍 i18n JargonText Verification\n');
console.log('Checking wizard messages structure parity...\n');

try {
  const enPath = path.join(WEB_DIR, 'lib', 'wizard-messages.ts');
  const ukPath = path.join(WEB_DIR, 'lib', 'wizard-messages.uk.ts');

  if (!fs.existsSync(enPath)) {
    console.error(`✗ English messages file not found: ${enPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(ukPath)) {
    console.error(`✗ Ukrainian messages file not found: ${ukPath}`);
    process.exit(1);
  }

  console.log(`✓ Found wizard-messages.ts`);
  console.log(`✓ Found wizard-messages.uk.ts\n`);

  // Read the files
  const enContent = fs.readFileSync(enPath, 'utf-8');
  const ukContent = fs.readFileSync(ukPath, 'utf-8');

  // Extract exports - look for "export const NAME = {"
  const enExports = extractExports(enContent);
  const ukExports = extractExports(ukContent);

  console.log(`📊 Found ${enExports.length} EN exports`);
  console.log(`📊 Found ${ukExports.length} UK exports\n`);

  if (enExports.length === 0) {
    console.error('✗ No exports found in English messages file');
    process.exit(1);
  }

  if (ukExports.length === 0) {
    console.error('✗ No exports found in Ukrainian messages file');
    process.exit(1);
  }

  // Dynamically import the actual modules using bun's TypeScript support
  const enModule = await import(enPath);
  const ukModule = await import(ukPath);

  // Get all exports from each module
  const enMessageObjects = getMessageObjects(enModule, enExports);
  const ukMessageObjects = getMessageObjects(ukModule, ukExports);

  console.log(`📦 EN exports: ${Object.keys(enMessageObjects).join(', ')}`);
  console.log(`📦 UK exports: ${Object.keys(ukMessageObjects).join(', ')}\n`);

  // Check correspondence
  let hasErrors = false;

  // 1. Check that each EN export has a corresponding UK export
  for (const enName of Object.keys(enMessageObjects)) {
    const pattern = enName.replace('Messages', '');
    const possibleUkName = Object.keys(ukMessageObjects).find(
      k => k.includes(pattern) && k.includes('Uk')
    );

    if (!possibleUkName) {
      console.error(`✗ No UK equivalent found for EN export: ${enName}`);
      hasErrors = true;
    }
  }

  // 2. Verify structure parity for main message objects
  console.log('🔍 Checking structure parity...\n');

  const mainCheckPairs = [
    { en: 'commonMessages', uk: 'commonMessagesUk' },
  ];

  // Find all page-specific messages
  for (const enName of Object.keys(enMessageObjects)) {
    if (enName === 'commonMessages') continue;
    const pattern = enName.replace('Messages', '');
    const ukName = Object.keys(ukMessageObjects).find(
      k => k.includes(pattern) && k.includes('Uk')
    );
    if (ukName) {
      mainCheckPairs.push({ en: enName, uk: ukName });
    }
  }

  for (const { en, uk } of mainCheckPairs) {
    const enObj = enMessageObjects[en];
    const ukObj = ukMessageObjects[uk];

    if (!enObj) {
      console.error(`✗ EN object not found: ${en}`);
      hasErrors = true;
      continue;
    }

    if (!ukObj) {
      console.error(`✗ UK object not found: ${uk}`);
      hasErrors = true;
      continue;
    }

    const structureCheck = verifyStructureParity(en, enObj, uk, ukObj);
    if (!structureCheck.valid) {
      hasErrors = true;
      for (const error of structureCheck.errors) {
        console.error(`✗ ${error}`);
      }
    } else {
      console.log(`✓ ${en} ↔ ${uk}: Structure valid`);
    }
  }

  console.log();

  if (hasErrors) {
    console.error(
      '\n✗ FAIL: i18n structure verification failed'
    );
    console.error('  Please ensure EN and UK messages have matching structure');
    process.exit(1);
  } else {
    console.log('='.repeat(60));
    console.log('✅ i18n Verification: PASSED');
    console.log('='.repeat(60));
    console.log('\n✓ All message structures are compatible');
    console.log('✓ Ukrainian translations ready for JargonText\n');
  }
} catch (error) {
  console.error('✗ Verification failed:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}

// Helper functions

function extractExports(content: string): string[] {
  const regex = /export const (\w+)\s*=/g;
  const exports: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    exports.push(match[1]);
  }
  return exports;
}

function getMessageObjects(module: any, exportNames: string[]): Record<string, any> {
  const objects: Record<string, any> = {};
  for (const name of exportNames) {
    if (module[name]) {
      objects[name] = module[name];
    }
  }
  return objects;
}

interface VerificationResult {
  valid: boolean;
  errors: string[];
}

function verifyStructureParity(
  enName: string,
  enObj: any,
  ukName: string,
  ukObj: any,
  path: string = ''
): VerificationResult {
  const errors: string[] = [];

  const currentPath = path ? `${path}` : enName;

  // Check keys match
  const enKeys = Object.keys(enObj).sort();
  const ukKeys = Object.keys(ukObj).sort();

  const missingInUk = enKeys.filter(k => !ukKeys.includes(k));
  const extraInUk = ukKeys.filter(k => !enKeys.includes(k));

  if (missingInUk.length > 0) {
    errors.push(
      `${currentPath}: Missing UK keys: ${missingInUk.join(', ')}`
    );
  }

  if (extraInUk.length > 0) {
    errors.push(
      `${currentPath}: Extra UK keys (not in EN): ${extraInUk.join(', ')}`
    );
  }

  // Check each key's type and structure
  for (const key of enKeys) {
    if (!ukKeys.includes(key)) continue;

    const enValue = enObj[key];
    const ukValue = ukObj[key];

    const enType = typeof enValue;
    const ukType = typeof ukValue;

    const newPath = path ? `${path}.${key}` : `${enName}.${key}`;

    // Type checking
    if (enType === 'string' && ukType !== 'string') {
      errors.push(`${newPath}: EN is string, UK is ${ukType}`);
    } else if (enType === 'object' && Array.isArray(enValue)) {
      // Arrays
      if (!Array.isArray(ukValue)) {
        errors.push(`${newPath}: EN is array, UK is ${ukType}`);
      } else if (enValue.length !== ukValue.length) {
        errors.push(
          `${newPath}: Array length mismatch (EN: ${enValue.length}, UK: ${ukValue.length})`
        );
      }
      // Check structure of array elements (especially for objects in array)
      // Verify all elements have consistent structure, not just [0]
      else if (enValue.length > 0 && ukValue.length > 0) {
        // Check if elements are objects (need structural comparison)
        const enFirst = enValue[0];
        const enFirstType = typeof enFirst;
        const isObjectArray = enFirstType === 'object' && enFirst !== null && Array.isArray(enFirst) === false;

        if (isObjectArray) {
          // Verify all EN and UK array elements match structure
          for (let i = 0; i < Math.min(enValue.length, ukValue.length); i++) {
            const enElem = enValue[i];
            const ukElem = ukValue[i];
            const enElemType = typeof enElem;
            const ukElemType = typeof ukElem;

            if (enElemType !== 'object' || enElem === null) {
              errors.push(
                `${newPath}[${i}]: EN element is ${enElemType}, UK element is ${ukElemType}`
              );
              continue;
            }

            if (ukElemType !== 'object' || ukElem === null) {
              errors.push(
                `${newPath}[${i}]: EN element is object, UK element is ${ukElemType}`
              );
              continue;
            }

            // Recursively check element structure
            const elementCheck = verifyStructureParity(
              `${enName}.${key}[${i}]`,
              enElem,
              `${ukName}.${key}[${i}]`,
              ukElem,
              `${newPath}[${i}]`
            );
            errors.push(...elementCheck.errors);
          }
        }
      }
    } else if (enType === 'object' && enValue !== null) {
      // Nested objects
      if (ukType !== 'object' || ukValue === null) {
        errors.push(`${newPath}: EN is object, UK is ${ukType}`);
      } else if (Array.isArray(enValue) || Array.isArray(ukValue)) {
        // Already handled above
        continue;
      } else {
        // Recursively check nested object
        const nestedCheck = verifyStructureParity(
          `${enName}.${key}`,
          enValue,
          `${ukName}.${key}`,
          ukValue,
          newPath
        );
        errors.push(...nestedCheck.errors);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

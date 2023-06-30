---
layout: post
title: Fix React TypeScript types error
date: 2023-06-30 16:22:07
excerpt: How to fix React TypeScript types error related to ReactNode.
categories: react typescript
---

## Problem

If you're getting the TypeScript error:

```
error TS2322: Type 'ReactNode' is not assignable to type '((string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal) & (string | ... 4 more ... | ReactPortal)) | null | undefined'.

  node_modules/@types/react-native/Libraries/Text/Text.d.ts:84:3
    84   children?: React.ReactNode;
         ~~~~~~~~
    The expected type comes from property 'children' which is declared here on type 'IntrinsicAttributes & TextProps & { variant?: VariantProp<never> | undefined; children: ReactNode; theme?: ThemeProp | undefined; style?: StyleProp<...>; } & { ...; }'
```

Or this error:

```
error TS2322: Type 'ReactNode' is not assignable to type '((string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal) & (string | ... 4 more ... | ReactPortal)) | null | undefined'.
  Type 'ReactElement<any, string | JSXElementConstructor<any>>' is not assignable to type '((string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal) & (string | ... 4 more ... | ReactPortal)) | null | undefined'.
    Type 'ReactElement<any, string | JSXElementConstructor<any>>' is not assignable to type 'React.ReactPortal & React.ReactPortal'.
      Property 'children' is missing in type 'ReactElement<any, string | JSXElementConstructor<any>>' but required in type 'ReactPortal'.

18       <Text>{props.children}</Text>
               ~~~~~~~~~~~~~~~~

  node_modules/@types/react-native/node_modules/@types/react/index.d.ts:192:9
    192         children: ReactNode;
                ~~~~~~~~
    'children' is declared here.
  node_modules/@types/react-native/Libraries/Text/Text.d.ts:84:3
    84   children?: React.ReactNode;
         ~~~~~~~~
    The expected type comes from property 'children' which is declared here on type 'IntrinsicAttributes & TextProps & { variant?: VariantProp<never> | undefined; children: ReactNode; theme?: ThemeProp | undefined; style?: StyleProp<...>; } & { ...; }'
```

This is caused by TypeScript trying to resolve multiple React versions (see [issue](https://github.com/facebook/react/issues/24304)).

## Solution

One [fix](https://github.com/facebook/react/issues/24304#issuecomment-1111184798) is to set `react` in `paths`:

```json
{
  "compilerOptions": {
    "paths": {
      "react": ["node_modules/@types/react"]
    }
  }
}
```

Here is another [workaround](https://github.com/facebook/react/issues/24304#issuecomment-1094565891).

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {TextNode} from 'lexical';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useLexicalTextEntity} from '@lexical/react/useLexicalTextEntity';
import {$createVictorNode, VictorNode} from '@lexical/victor';
import {useCallback, useEffect} from 'react';

const REGEX = new RegExp('victor', 'i');

export function VictorPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([VictorNode])) {
      throw new Error('VictorPlugin: VictorNode not registered on editor');
    }
  }, [editor]);

  const createVictorNode = useCallback((textNode: TextNode): VictorNode => {
    return $createVictorNode(textNode.getTextContent());
  }, []);

  const getVictorMatch = useCallback((text: string) => {
    const matchArr = REGEX.exec(text);

    if (matchArr === null) {
      return null;
    }

    const hashtagLength = matchArr[0].length + 1;
    const startOffset = matchArr.index;
    const endOffset = startOffset + hashtagLength;
    return {
      end: endOffset,
      start: startOffset,
    };
  }, []);

  useLexicalTextEntity<VictorNode>(
    getVictorMatch,
    VictorNode,
    createVictorNode,
  );

  return null;
}

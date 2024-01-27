/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
} from 'lexical';

import {addClassNamesToElement} from '@lexical/utils';
import {$applyNodeReplacement, TextNode} from 'lexical';

/** @noInheritDoc */
export class VictorNode extends TextNode {
  static getType(): string {
    return 'victor';
  }

  static clone(node: VictorNode): VictorNode {
    return new VictorNode(node.__text, node.__key);
  }

  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    addClassNamesToElement(element, config.theme.victor);
    return element;
  }

  static importJSON(serializedNode: SerializedTextNode): VictorNode {
    const node = $createVictorNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
      type: 'victor',
    };
  }

  canInsertTextBefore(): boolean {
    return false;
  }

  isTextEntity(): true {
    return true;
  }
}

/**
 * Generates a VictorNode, which is a string with only Victor in the text.
 * @param text - The text used inside the VictorNode.
 * @returns - The VictorNode with the embedded text.
 */
export function $createVictorNode(text = ''): VictorNode {
  return $applyNodeReplacement(new VictorNode(text));
}

/**
 * Determines if node is a VictorNode.
 * @param node - The node to be checked.
 * @returns true if node is a VictorNode, false otherwise.
 */
export function $isVictorNode(
  node: LexicalNode | null | undefined,
): node is VictorNode {
  return node instanceof VictorNode;
}

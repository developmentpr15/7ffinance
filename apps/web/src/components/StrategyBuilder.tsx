'use client';
import { useState } from 'react';
import BlocklyComponent, { Workspace } from 'react-blockly';
import Blockly from 'blockly';

// minimal blocks: indicator, comparator, value
const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      contents: [
        { type: 'logic_compare', kind: 'block' },
        { type: 'math_number', kind: 'block' },
        { type: 'indicator', kind: 'block' },
      ],
    },
  ],
};

// custom indicator block
Blockly.Blocks['indicator'] = {
  init: function () {
    this.appendDummyInput().appendField('Indicator');
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['RSI', 'RSI'],
        ['MACD', 'MACD'],
        ['Price', 'PRICE'],
      ]),
      'INDICATOR'
    );
    this.setOutput(true, 'Number');
    this.setColour(230);
  },
};

export default function StrategyBuilder() {
  const [xml, setXml] = useState('');
  const [name, setName] = useState('');

  const save = async () => {
    const code = Blockly.JavaScript.workspaceToCode(
      Blockly.getMainWorkspace()
    );
    await fetch('/api/strategy', {
      method: 'POST',
      body: JSON.stringify({ name, rules: code }),
      headers: { 'Content-Type': 'application/json' },
    });
    alert('Saved!');
  };

  return (
    <div>
      <input
        className="border p-2 mb-4"
        placeholder="Strategy name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <BlocklyComponent
        toolbox={toolbox}
        workspace={{ setXml, xml }}
        className="h-96"
      />
      <button
        onClick={save}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Save Strategy
      </button>
    </div>
  );
}
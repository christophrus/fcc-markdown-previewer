import React, { Component } from 'react';
import './App.css';
import marked from 'marked';
import Box from './components/Box'

var renderer = new marked.Renderer();
renderer.link = (href, title, text)  => `<a target="_blank" href="${href}" title="${title}">${text}</a>`;

const defaultInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        editor: { isHidden: false, isMaximized: false },
        preview: { isHidden: false, isMaximized: false },
      inputText: defaultInput,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputText: e.target.value
    })
  }

  handleToggle(name) {
     
    let state = {
      editor: Object.assign({}, this.state.editor),
      preview: Object.assign({}, this.state.preview)
    } 

    state[name].isMaximized = !state[name].isMaximized;
    state.preview.isHidden = state.editor.isMaximized ? true : false;
    state.editor.isHidden = state.preview.isMaximized ? true : false;

    this.setState({
      editor: state.editor, preview: state.preview
    });

  }

  render() {
    let renderedText = { __html: marked(this.state.inputText, {breaks: true, renderer: renderer}) };

    return (
      <main className="flex justify-center bg-orange-lightest items-center flex-col">
        <Box className="h-screen" name="editor" isMaximized={this.state.editor.isMaximized} isHidden={this.state.editor.isHidden} onToggle={this.handleToggle}>
          <textarea className="w-full p-2 min-h-48 bg-transparent" id="editor" onChange={this.handleChange} value={this.state.inputText}></textarea>
        </Box>
        <Box className="min-h-screen" name="preview" isMaximized={this.state.preview.isMaximized} isHidden={this.state.preview.isHidden} onToggle={this.handleToggle}>
          <div className="p-6 w-4/5" dangerouslySetInnerHTML={renderedText} id="preview"></div>
        </Box>
      </main>
    );
  }
}

export default App;

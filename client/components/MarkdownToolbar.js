import React from 'react';
import Button from 'react-bootstrap/Button';
import { At, ChatLeft, Code, Image, Link, ListOl, ListTask, ListUl, Quote, TypeBold, TypeH1, TypeItalic } from 'react-bootstrap-icons';

const toolbarActions = [
  {
    element: 'md-bold',
    props: {},
    icon: TypeBold,
  },
  {
    element: 'md-header',
    props: { level: "1" },
    icon: TypeH1,
  },
  {
    element: 'md-italic',
    props: {},
    icon: TypeItalic,
  },
  {
    element: 'md-quote',
    props: {},
    icon: Quote,
  },
  {
    element: 'md-code',
    props: {},
    icon: Code,
  },
  {
    element: 'md-link',
    props: {},
    icon: Link,
  },
  {
    element: 'md-image',
    props: {},
    icon: Image,
  },
  {
    element: 'md-unordered-list',
    props: {},
    icon: ListUl,
  },
  {
    element: 'md-ordered-list',
    props: {},
    icon: ListOl,
  },
  {
    element: 'md-task-list',
    props: {},
    icon: ListTask,
  },
  {
    element: 'md-mention',
    props: {},
    icon: At,
  },
  {
    element: 'md-ref',
    props: {},
    icon: ChatLeft,
  },
]

export default function MarkdownToolbar(props) {
  React.useEffect(() => {
    import('@github/markdown-toolbar-element');
  }, []);

  return (
    <markdown-toolbar for={props.htmlFor}>
      {toolbarActions.map((toolbarAction) => (
        <toolbarAction.element {...toolbarAction.props} key={toolbarAction.element}>
          <Button variant="outline-secondary" size="sm">
            <toolbarAction.icon />
          </Button>
        </toolbarAction.element>
      ))}
    </markdown-toolbar>
  );
}

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

export default function MarkdownRegion(props) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={props.className} components={{
      img: (imgProps) => {
        console.log(imgProps);
        const TheComponent = Image;
        return (
          <a href={imgProps.src} target="_blank" rel="noreferrer">
            <TheComponent {...imgProps.node.properties} width="1920" height="1080" style={{ maxWidth: '100%', height: 'auto' }} />
          </a>
        );
      }
    }}>
      {props.children}
    </ReactMarkdown>
  );
}

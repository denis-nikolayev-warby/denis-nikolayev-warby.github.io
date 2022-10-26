import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import {styled} from '@mui/material';
import {Key, useState} from 'react';

const Panel = styled('div')(({theme}) => ({
  padding: '10px',
  backgroundColor: '#1E1E1E',
  height: '100%',
  overflow: 'auto',
  fontFamily: 'monaco, Consolas, Menlo, Courier, monospace',
  paddingBottom: '20px',
  color: '#fff',
}));

const HiddenText = styled('span')(({theme}) => ({
  width: '1px',
  height: '1px',
  whiteSpace: 'pre',
  overflow: 'hidden',
  display: 'inline-block',
  color: '#1E1E1E',
}));

const ElipsisIcon = styled(SettingsEthernetIcon)({
  verticalAlign: 'bottom',
  fontSize: '1.1rem',
  marginLeft: '5px',
  marginRight: '5px',
});

const Comment = styled('span')({
  color: '#6A993E',
  userSelect: 'none',
  display: 'inline-block',
  marginLeft: '10px',
});

interface Properties {
  node: any;
  property?: string;
  level: number;
  trailComma?: boolean;
}

export function JsonPreview({json}: {json: any}) {
  return (
    <Panel>
      <JsonNode node={json} level={0} />
    </Panel>
  );
}

function JsonNode(props: Properties) {
  const {node} = props;

  if (typeof node === 'string') {
    return <JsonString {...props} />;
  } else if (Array.isArray(node)) {
    return <JsonArray {...props} />;
  } else if (typeof node === 'object' && node !== null) {
    return <JsonObject {...props} />;
  } else {
    return <JsonPrimitive {...props} />;
  }
}
// test
function JsonObject({node, ...props}: Properties) {
  const [isCollapsed, setCollapsed] = useState(false);
  const entries = Object.entries(node).filter(([, value]) => value !== undefined);

  if (!isCollapsed) {
    return (
      <>
        <Row {...props} startNode collapsed={false} onClick={() => setCollapsed(true)}>
          {'{'}
        </Row>
        {entries.map(([key, value], index) => (
          <JsonNode
            key={index}
            node={value}
            property={key}
            level={props.level + 1}
            trailComma={index < entries.length - 1}
          />
        ))}
        <Row {...props} endNode>
          {'}'}
        </Row>
      </>
    );
  } else {
    const s = trimAndAddPrefix(JSON.stringify(node, null, 2), props.level);
    return (
      <Row {...props} startNode endNode collapsed={true} onClick={() => setCollapsed(false)}>
        {'{'}
        <ElipsisIcon />
        <HiddenText>{s}</HiddenText>
        {'}'}
      </Row>
    );
  }
}

const StringValue = styled('span')(({theme}) => ({
  color: '#CE9178',
}));
function JsonString({node, ...props}: Properties) {
  return (
    <Row {...props} startNode endNode>
      <StringValue>{JSON.stringify(node)}</StringValue>
    </Row>
  );
}

const PrimitiveValue = styled('span')(({theme}) => ({
  color: '#569CD6',
}));

function JsonPrimitive({node, ...props}: Properties) {
  return (
    <Row {...props} startNode endNode>
      <PrimitiveValue>{JSON.stringify(node)}</PrimitiveValue>
    </Row>
  );
}

function JsonArray({node, ...props}: Properties) {
  const [isCollapsed, setCollapsed] = useState(false);
  if (node.length == 0) {
    return (
      <Row {...props} startNode endNode>
        {'[]'}
      </Row>
    );
  }

  if (!isCollapsed) {
    return (
      <>
        <Row {...props} startNode collapsed={false} onClick={() => setCollapsed(true)}>
          {'['}
        </Row>
        {node.map((item: any, index: number) => (
          <JsonNode
            key={index}
            node={item}
            level={props.level + 1}
            trailComma={index < node.length - 1}
          />
        ))}
        <Row {...props} endNode>
          {']'}
        </Row>
      </>
    );
  } else {
    const s = trimAndAddPrefix(JSON.stringify(node, null, 2), props.level);
    return (
      <Row {...props} startNode collapsed={true} onClick={() => setCollapsed(false)}>
        {'['}
        <ElipsisIcon />
        <HiddenText>{s}</HiddenText>
        {']'}
        {props.trailComma && <TrailComma>,</TrailComma>}
        {node.length == 1 ? (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <Comment>// 1 item</Comment>
        ) : (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <Comment>// {node.length} items</Comment>
        )}
      </Row>
    );
  }
}

const NodeElement = styled('div')<{level: number}>({flex: '1', whiteSpace: 'nowrap'});
const Whitespace = styled('span')({whiteSpace: 'pre'});
const PropertyName = styled('span')(({theme}) => ({
  color: '#4EC9B0',
}));
const TrailComma = styled('span')(({theme}) => ({
  color: '#fff',
}));
const Colon = styled('span')(({theme}) => ({
  color: '#fff',
  marginLeft: '1px',
  marginRight: '4px',
}));

const RowElement = styled('div')({display: 'flex'});
const PrefixElement = styled('div')({flex: '0 0 24px', height: '1em'});

function Row(props: {
  level: number;
  property?: string;
  children: React.ReactNode;
  trailComma?: boolean;
  startNode?: boolean;
  endNode?: boolean;
  collapsed?: boolean;
  onClick?: (action: 'collapse' | 'expand') => void;
}) {
  return (
    <RowElement>
      <PrefixElement>
        {props.collapsed == undefined ? (
          <></>
        ) : props.collapsed ? (
          <ArrowDropUpIcon onClick={() => props.onClick && props.onClick('collapse')} />
        ) : (
          <ArrowDropDownIcon onClick={() => props.onClick && props.onClick('expand')} />
        )}
      </PrefixElement>
      <NodeElement level={props.level}>
        <Whitespace>{'  '.repeat(props.level)}</Whitespace>
        {props.startNode && props.property && (
          <>
            <PropertyName>{JSON.stringify(props.property)}</PropertyName>
            <Colon>:</Colon>
          </>
        )}
        {props.children}
        {props.endNode && props.trailComma && <TrailComma>,</TrailComma>}
      </NodeElement>
    </RowElement>
  );
}

function trimAndAddPrefix(s: string, level: number) {
  const prefix = '  '.repeat(level);
  return (
    s
      .substring(1, s.length - 2)
      .split('\n')
      .map(line => prefix + line)
      .join('\n') +
    '\n' +
    prefix
  );
}

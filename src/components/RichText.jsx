// Renders Sanity rich text (Portable Text) limited to what the Studio allows:
// paragraphs, bold, italic and links. Plain strings still render as one paragraph.

function Span({ span, markDefs }) {
  return span.marks.reduceRight((children, mark) => {
    if (mark === 'strong') return <strong>{children}</strong>;
    if (mark === 'em') return <em>{children}</em>;
    const def = markDefs.find((d) => d._key === mark);
    if (def?._type === 'link' && def.href) {
      const external = /^https?:/.test(def.href);
      return (
        <a href={def.href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
          {children}
        </a>
      );
    }
    return children;
  }, span.text);
}

export default function RichText({ value, className }) {
  if (!value) return null;
  if (typeof value === 'string') return <p className={className}>{value}</p>;

  return (
    <div className={className}>
      {value
        .filter((block) => block._type === 'block')
        .map((block) => (
          <p key={block._key}>
            {block.children.map((span) => (
              <Span key={span._key} span={span} markDefs={block.markDefs || []} />
            ))}
          </p>
        ))}
    </div>
  );
}

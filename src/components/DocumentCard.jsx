import "./DocumentCard.css";

function DocTags({ attributes }) {
  return (
    <div className="doc-card__tags">
      {attributes.isTechNews && (
        <span className="doc-card__tag doc-card__tag--yellow">
          Технические новости
        </span>
      )}
      {attributes.isAnnouncement && (
        <span className="doc-card__tag doc-card__tag--green">
          Анонсы и события
        </span>
      )}
      {attributes.isDigest && (
        <span className="doc-card__tag doc-card__tag--orange">
          Сводки новостей
        </span>
      )}
    </div>
  );
}

export default function DocumentCard({ doc }) {
  return (
    <article className="doc-card">
      <div className="doc-card__meta">
        <span className="doc-card__date">{doc.date}</span>
        <a href={doc.url} target="_blank" rel="noreferrer" className="doc-card__source">
          {doc.source}
        </a>
      </div>
      <h3 className="doc-card__title">{doc.title}</h3>
      <DocTags attributes={doc.attributes} />
      {doc.image && (
        <img src={doc.image} alt={doc.title} className="doc-card__image" />
      )}
      <p className="doc-card__text">{doc.text}</p>
      <div className="doc-card__footer">
        <a
          href={doc.url}
          target="_blank"
          rel="noreferrer"
          className="doc-card__button"
        >
          Читать в источнике
        </a>
        <span className="doc-card__words">{doc.wordCount} слов</span>
      </div>
    </article>
  );
}

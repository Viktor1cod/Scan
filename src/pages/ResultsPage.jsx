import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Histogram from "../components/Histogram";
import { mockHistograms, mockDocuments } from "../mocks/searchData";
import "./ResultsPage.css";

const PAGE_SIZE = 10;

function renderTags(attributes) {
  const tags = [];
  if (attributes.isTechNews)
    tags.push(
      <span key="tech" className="doc-card__tag doc-card__tag--yellow">
        Технические новости
      </span>
    );
  if (attributes.isAnnouncement)
    tags.push(
      <span key="ann" className="doc-card__tag doc-card__tag--green">
        Анонсы и события
      </span>
    );
  if (attributes.isDigest)
    tags.push(
      <span key="dig" className="doc-card__tag doc-card__tag--orange">
        Сводки новостей
      </span>
    );
  return tags;
}

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const [isLoading, setIsLoading] = useState(true);
  const [histograms, setHistograms] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (!formData) {
      navigate("/search");
      return;
    }
    const timer = setTimeout(() => {
      setHistograms(mockHistograms);
      setAllDocuments(mockDocuments);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const visibleDocuments = allDocuments.slice(0, visibleCount);

  return (
    <div className="results-page">
      <Header />
      <main className="results-main">
        <div className="container">
          <h1 className="results-page__title">РЕЗУЛЬТАТЫ ПОИСКА</h1>

          <section className="results-summary">
            <h2 className="results-summary__title">ОБЩАЯ СВОДКА</h2>
            {isLoading ? (
              <div className="results-loader">
                <div className="results-loader__spinner" />
                <p className="results-loader__text">Загружаем данные...</p>
              </div>
            ) : (
              <Histogram data={histograms} />
            )}
          </section>

          {!isLoading && (
            <section className="results-documents">
              <h2 className="results-documents__title">СПИСОК ДОКУМЕНТОВ</h2>
              <div className="documents-grid">
                {visibleDocuments.map((doc) => (
                  <article key={doc.id} className="doc-card">
                    <div className="doc-card__meta">
                      <span>{doc.date}</span>
                      <a href={doc.url} target="_blank" rel="noreferrer">
                        {doc.source}
                      </a>
                    </div>
                    <h3 className="doc-card__title">{doc.title}</h3>
                    <div className="doc-card__tags">{renderTags(doc.attributes)}</div>
                    {doc.image && (
                      <img
                        src={doc.image}
                        alt={doc.title}
                        className="doc-card__image"
                      />
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
                ))}
              </div>

              {visibleCount < allDocuments.length && (
                <button
                  type="button"
                  className="show-more-button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                >
                  Показать больше
                </button>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ResultsPage;

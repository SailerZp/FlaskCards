// App.jsx — основной компонент приложения с карточками
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [cards, setCards] = useState([]);      // массив карточек
  const [index, setIndex] = useState(0);       // текущая карточка
  const [showAnswer, setShowAnswer] = useState(false);  // показать перевод

  const [word, setWord] = useState("");        // Слово
  const [kanji, setKanji] = useState("");      // Кандзи
  const [reading, setReading] = useState("");  // Транскрипция
  const [translation, setTranslation] = useState(""); // Перевод
  const [imageUrl, setImageUrl] = useState("");       // Ссылка на картинку

  // Загружаем карточки из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem("flashcards");
    if (saved) setCards(JSON.parse(saved));
  }, []);

  // Добавление карточки
  const addCard = () => {
    if (!word || !translation) return;
    const newCard = { word, kanji, reading, translation, imageUrl };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem("flashcards", JSON.stringify(updatedCards));
    setWord(""); setKanji(""); setReading(""); setTranslation(""); setImageUrl("");
    setIndex(updatedCards.length - 1); setShowAnswer(false);
  };

  // Следующая карточка
  const nextCard = () => {
    if (cards.length === 0) return;
    setShowAnswer(false);
    setIndex((index + 1) % cards.length);
  };

  // Удаление карточки
  const deleteCard = () => {
    const filtered = cards.filter((_, i) => i !== index);
    setCards(filtered);
    localStorage.setItem("flashcards", JSON.stringify(filtered));
    setIndex(0);
    setShowAnswer(false);
  };

  // Редактирование карточки
  const editCard = () => {
    const card = cards[index];
    setWord(card.word); setKanji(card.kanji); setReading(card.reading); 
    setTranslation(card.translation); setImageUrl(card.imageUrl);
    const updated = cards.filter((_, i) => i !== index);
    setCards(updated);
    localStorage.setItem("flashcards", JSON.stringify(updated));
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"flex-start", fontFamily:"Arial",
      paddingTop:40
    }}>
      <h2>Карточки для изучения слов</h2>

      {cards.length === 0 ? (
        <p>Добавь первую карточку ниже</p>
      ) : (
        <div style={{
          border:"1px solid #ccc", padding:20, marginBottom:20,
          display:"flex", flexDirection:"column", alignItems:"center",
          textAlign:"center", maxWidth:"90vw"
        }}>
          <h3>{cards[index].word}</h3>
          {cards[index].kanji && <div>{cards[index].kanji}</div>}
          {cards[index].imageUrl && <img src={cards[index].imageUrl}
               style={{maxWidth:"90vw", maxHeight:"50vh", objectFit:"contain", marginTop:10}} />}
          {showAnswer && (<>{cards[index].reading && <div>{cards[index].reading}</div>}
                           <strong>{cards[index].translation}</strong></>)}

          <div style={{marginTop:10}}>
            <button onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? "Скрыть" : "Показать перевод"}
            </button>
            <button onClick={nextCard} style={{marginLeft:10}}>Следующая</button>
            <button onClick={editCard} style={{marginLeft:10, backgroundColor:"#8cf"}}>Редактировать</button>
            <button onClick={deleteCard} style={{marginLeft:10, backgroundColor:"#f88"}}>Удалить</button>
          </div>
        </div>
      )}

      <h3>Добавить карточку</h3>
      <input placeholder="Слово" value={word} onChange={e=>setWord(e.target.value)}/><br/>
      <input placeholder="Кандзи" value={kanji} onChange={e=>setKanji(e.target.value)}/><br/>
      <input placeholder="Транскрипция" value={reading} onChange={e=>setReading(e.target.value)}/><br/>
      <input placeholder="Перевод" value={translation} onChange={e=>setTranslation(e.target.value)}/><br/>
      <input placeholder="Ссылка на картинку" value={imageUrl} onChange={e=>setImageUrl(e.target.value)}/><br/>

      <button onClick={addCard} style={{marginTop:10}}>Добавить</button>
    </div>
  );
}

export default App;

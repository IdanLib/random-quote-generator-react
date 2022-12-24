import { useState, useEffect } from 'react'
import './styles.css'
import twitterIcon from "./assets/twitter.svg"
import colors from "./Components/colors";

function App() {

  const [quote, setQuote] = useState(false);
  const [getQuoteAgain, setGetQuoteAgain] = useState(0);
  const [bgColor, setBgColor] = useState(0);

  useEffect(() => {
    async function getQuote() {
      const res = await fetch("https://quotable.io/random");
      const data = await res.json();
      const quote = {
        quoteText: data.content,
        author: data.author
      }
      setQuote(quote);
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    }
    getQuote();
  }, [getQuoteAgain]);

  const handleClick = () => {
    setGetQuoteAgain(prev => !prev);
  }

  const QuoteComp = () => {
    return (
      <div >
        <p id="text">
          {quote.quoteText}
        </p>
        <p id="author">
          {quote.author}
        </p>
      </div>
    )
  }

  const GetQuoteBtn = () => {
    return (
      <button id="new-quote"
        onClick={handleClick}
      >
        Get Another Quote
      </button>
    )
  }

  const TwitterShare = () => {
    return (
      <a id="tweet-quote" target="_blank" href={`https://twitter.com/intent/tweet?hashtags=inspiration&text=${quote.quoteText} -${quote.author}`}>
        <img width="30" height="30" src={twitterIcon} alt="Twitter" />
      </a>
    )
  }

  return (
    <div className="app" id="quote-box"
      style={{
        backgroundColor: bgColor
      }}>
      <h1>Random Quote Machine</h1>
      <h2>Wisdom From All Over</h2>
      <QuoteComp />
      {quote && <TwitterShare />}
      <GetQuoteBtn />
    </div >
  )
}

export default App;

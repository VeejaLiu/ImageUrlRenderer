import './App.css';
import { useRef, useState } from 'react';
import InputContainer from './input/InputContainer.tsx';
import GeneralButton from './button/GeneralButton.tsx';
import Card from './card/Card.tsx';

function App() {
  const inputTextRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [history, setHistory] = useState<
    {
      imageUrl: string;
      name?: string;
      addDate: Date | string;
    }[]
  >([]);

  const getHistoryFromLocalStorage = () => {
    const historyData = localStorage.getItem('image-renderer-history');
    console.log('Got history data: ', historyData);
    if (historyData) {
      const jsonParseRes = JSON.parse(historyData);
      console.log('Parsed history data: ', jsonParseRes);
      return jsonParseRes;
    }
  };

  useState(() => {
    const data = getHistoryFromLocalStorage();
    if (data) {
      setHistory(data);
    }
  });

  const renderImage = () => {
    if (!inputTextRef.current) {
      return;
    }
    const inputText = inputTextRef.current.getValue();

    if (!inputText) {
      return;
    }

    const newEntry = {
      imageUrl: inputText,
      addDate: new Date(),
    };

    let updatedHistory = [...history];

    const existingIndex = updatedHistory.findIndex(
      (item) => item.imageUrl === inputText,
    );

    if (existingIndex !== -1) {
      updatedHistory[existingIndex] = newEntry;
    } else {
      updatedHistory.push(newEntry);
    }

    setImageUrl(inputText);

    // 更新的添加时间，放在最上面
    updatedHistory = updatedHistory.sort((a, b) => {
      return new Date(b.addDate).getTime() - new Date(a.addDate).getTime();
    });

    setHistory(updatedHistory);
    localStorage.setItem(
      'image-renderer-history',
      JSON.stringify(updatedHistory),
    );
  };

  return (
    <div className="container">
      <div className="left-container">
        <div className={'input-and-button-container'}>
          <InputContainer
            maxLength={10000}
            ref={inputTextRef}
            onEnterPressed={renderImage}
          />
          <GeneralButton onClick={renderImage} text="Show image" />
        </div>

        <div className={'history-container'}>
          {history.map((item, index) => (
            <Card
              key={index}
              imageUrl={item.imageUrl}
              name={item.name}
              addDate={item.addDate}
              onClick={() => {
                inputTextRef.current.setValue(item.imageUrl);
                setImageUrl(item.imageUrl);
              }}
            ></Card>
          ))}
        </div>
        <div className="history"></div>
      </div>

      <div className="vertical-line"></div>

      <div className="renderer-container">
        <img
          id="image-renderer"
          className="renderer"
          src={imageUrl}
          alt="Rendered Image"
        />
      </div>
    </div>
  );
}

export default App;

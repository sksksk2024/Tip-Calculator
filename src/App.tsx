import React, { useState } from 'react';

const App: React.FC = () => {
  const [bill, setBill] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState<number>(0);
  const [people, setPeople] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const getTipAmount = () => {
    const tip = customTip || tipPercentage || 0;
    return (tip / 100) * bill;
  };

  const getTotalAmount = () => {
    return bill + getTipAmount();
  };

  const tipAmountPerPerson = () => {
    if (people <= 0) return 0;
    return getTipAmount() / people;
  };

  const totalAmountPerPerson = () => {
    if (people <= 0) return 0;
    return getTotalAmount() / people;
  };

  const handlePeopleInput = (value: string) => {
    const parsedValue = parseInt(value, 10);
    setPeople(parsedValue);

    if (isNaN(parsedValue) || parsedValue <= 0) {
      setError("Can't be zero");
    } else {
      setError(null);
    }
  };

  const handleReset = () => {
    setBill(0);
    setTipPercentage(null);
    setCustomTip(0);
    setPeople(1);
    setError(null);
  };

  return (
    <div>
      <article>
        <section>
          <span className="splitter">spli</span><span className="splitter">tter</span>
        </section>

        <section className="panel">
          <form id="tip-form">
            <label htmlFor="bill">Bill</label>
            <input
              placeholder="0"
              className="input-dollar mb-2"
              name="bill"
              id="bill"
              type="number"
              min="1"
              value={bill}
              onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
            />

            <label htmlFor="bill" style={{ marginBottom: '10px' }}>Selected Tip %</label>

            <fieldset className="tip-amounts mb-2">
              {[5, 10, 15, 25, 50].map((value) => (
                <div key={value}>
                  <input
                    id={`radio${value}`}
                    name="tip"
                    type="radio"
                    value={value}
                    checked={tipPercentage === value}
                    onChange={() => {
                      setTipPercentage(value);
                      setCustomTip(0);
                    }}
                  />
                  <label htmlFor={`radio${value}`}>{value}%</label>
                </div>
              ))}
              <input
                id="custom-tip"
                className="input-custom custom-tip"
                placeholder="CUSTOM"
                type="number"
                min="0"
                value={customTip}
                onChange={(e) => {
                  setCustomTip(parseFloat(e.target.value) || 0);
                  setTipPercentage(null);
                }}
              />
            </fieldset>

            <div>
              <div className="inline">
                <label htmlFor="people">Number of People</label>
                {error && <span id="error" className="error-message">{error}</span>}
              </div>
              <input
                placeholder="0"
                className={`input-person ${error ? 'error' : ''}`}
                name="people"
                id="people"
                type="number"
                min="1"
                value={people}
                onChange={(e) => handlePeopleInput(e.target.value)}
              />
            </div>
          </form>

          <div className="results">
            <div className="row mb-2">
              <div>
                <div>Tip Amount</div>
                <div className="text-gray">/ person</div>
              </div>
              <aside id="tip-amount">
                ${error ? "error" : tipAmountPerPerson().toFixed(2)}
              </aside>
            </div>

            <div className="row mb-2">
              <div>
                <div>Total</div>
                <div className="text-gray">/ person</div>
              </div>
              <aside id="total-amount">
                ${error ? "error" : totalAmountPerPerson().toFixed(2)}
              </aside>
            </div>

            <button id="reset" className="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </section>
      </article>
    </div>
  );
};

export default App;
import React, { useState } from 'react';

import WINNER_COMPS from './winner-comps.json';

import './App.css';

const SLOTS: Array<number> = [...Array(9).keys()];

const App: React.FC = () => {
  const [player, setPlayer] = useState<'X' | 'O'>('X');
  const [used] = useState(() => new Map());
  const [winnerComp, setWinnerComp] = useState<Array<number>>();
  const hasFinished = Boolean(winnerComp);

  function handleSlotClick(player: string, slot: number) {
    used.set(slot, player);

    setWinnerComp(
      WINNER_COMPS.find(
        comp => comp.filter(slot => used.get(slot) !== player).length === 0
      )
    );

    setPlayer(player === 'X' ? 'O' : 'X');
  }

  function handleReset() {
    used.clear();
    setWinnerComp(undefined);
  }

  return (
    <>
      <main>
        {SLOTS.map(slot => {
          const owner = used.get(slot);

          return (
            <div
              key={slot}
              className={
                winnerComp && winnerComp.includes(slot) ? 'primary' : ''
              }
              onClick={() =>
                !hasFinished && !owner && handleSlotClick(player, slot)
              }
            >
              {owner}
            </div>
          );
        })}
      </main>
      {hasFinished && (
        <button id="reset" onClick={handleReset}>
          RESET
        </button>
      )}
    </>
  );
};

export default App;

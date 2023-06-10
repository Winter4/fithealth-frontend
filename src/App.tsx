import "@/assets/scss/styles.scss";
import { Layout } from "./layout/Layout";
import { useState, useMemo } from "react";
import { ITab } from "@/types";
import { Inset, LineProducts, Launch } from "./components";
import { useAppSelector } from "./hooks/useRedux";
import { Calories } from "@/context/calories";

function App() {
  const cards = useAppSelector((state) => state.calories);
  console.log("🚀 ~ file: App.tsx:11 ~ App ~ cards:", cards)

  const max = useMemo(() => cards.reduce((a, b) => a + b.calories, 0), [cards]);

  const value = useMemo(
    () => cards.reduce((a, b) => a + b.ateColories, 0),
    [cards]
  );

  const calories: { max: number; value: number } = { max, value };

  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs] = useState<ITab[]>([
    {
      label: "Завтрак",
      content: <Launch cards={cards} />,
    },
    { label: "Перекус 1", content: "Content for tab 2" },
    { label: "Обед", content: "Content for tab 3" },
    { label: "Перекус 2", content: "Content for tab 4" },
    { label: "Ужин", content: "Content for tab 5" },
  ]);

  const switchTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Calories.Provider value={calories}>
      <Layout>
        <main className="main">
          <div className="main__container container">
            <LineProducts />
            <Inset tabs={tabs} switchTab={switchTab} activeIndex={activeTab} />
          </div>
        </main>
      </Layout>
    </Calories.Provider>
  );
}

export default App;

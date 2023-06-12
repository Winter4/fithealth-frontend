import "@/assets/scss/styles.scss";
import { Layout } from "./layout/Layout";
import { useState, useEffect } from "react";
import { ITab } from "@/types";
import { Inset, LineProducts, CardList } from "./components";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { Calories } from "@/context/calories";
import { FetchUserData } from "./store/user";
import { FetchCaloriesData } from "./store/calories";

function App() {
  const dispath = useAppDispatch();
  const cards = useAppSelector((state) => state.calories);
  const user = useAppSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs] = useState<ITab[]>([
    {
      label: "Завтрак",
      content: <CardList cards={cards.products} />,
    },
    { label: "Перекус 1", content: <CardList cards={cards.products} /> },
    { label: "Обед", content: <CardList cards={cards.products} /> },
    { label: "Перекус 2", content: <CardList cards={cards.products} /> },
    { label: "Ужин", content: <CardList cards={cards.products} /> },
  ]);

  useEffect(() => {
    const uuid = document.URL.split("/").pop()!;
    dispath(FetchUserData(uuid));
    dispath(FetchCaloriesData());
  }, [dispath]);

  const max = user.user.calories;

  const value = cards.ateCalories;

  const calories: { max: number; value: number } = { max, value };

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

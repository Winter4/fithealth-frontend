import { useState, useEffect } from "react";
import { ITab } from "@/types";
import { Inset, LineProducts, CardList } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Calories } from "@/context/calories";
import { FetchUserData } from "@/store/user";
import {
  FetchCaloriesData,
  FetchAllowedFoodData,
  FetchFoodData,
} from "@/store/calories";
import { Tab } from "@/context/tab";
import { Layout } from "@/layout/Layout";

export function Home() {
  const dispath = useAppDispatch();
  const cards = useAppSelector((state) => state.calories);
  const user = useAppSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs] = useState<ITab[]>([
    {
      id: "0",
      label: "Завтрак",
      content: <CardList cards={cards.products} />,
    },
    {
      id: "1",
      label: "Перекус 1",
      content: <CardList cards={cards.products} />,
    },
    { id: "2", label: "Обед", content: <CardList cards={cards.products} /> },
    {
      id: "3",
      label: "Перекус 2",
      content: <CardList cards={cards.products} />,
    },
    { id: "4", label: "Ужин", content: <CardList cards={cards.products} /> },
  ]);

  useEffect(() => {
    const uuid = document.URL.split("/").pop();
    if (uuid)
      dispath(FetchUserData(uuid))
        .then(() => dispath(FetchCaloriesData()))
        .then(() => dispath(FetchAllowedFoodData()))
        .then(() => dispath(FetchFoodData(activeTab)));
  }, [dispath]);

  const max = user.user.calories || 0;

  const value = cards.ateCalories || 0;

  const calories: { max: number; value: number } = { max, value };

  const switchTab = (index: number) => {
    setActiveTab(index);
    dispath(FetchFoodData(index));
  };

  return (
    <Tab.Provider value={activeTab}>
      <Calories.Provider value={calories}>
        <Layout>
          <main className="main">
            <div className="main__container container">
              <LineProducts />
              <Inset
                tabs={tabs}
                switchTab={switchTab}
                activeIndex={activeTab}
              />
            </div>
          </main>
        </Layout>
      </Calories.Provider>
    </Tab.Provider>
  );
}

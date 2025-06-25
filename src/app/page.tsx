"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/index.module.css";

export default function Home() {
  // 状态管理
  const [foodList, setFoodList] = useState<string[]>([]);
  const [showFoodList, setShowFoodList] = useState(false);
  const [newFood, setNewFood] = useState("");
  const [timeClass, setTimeClass] = useState("");

  // 从localStorage加载食物列表
  useEffect(() => {
    const savedFood = localStorage.getItem("yolo-food");
    if (savedFood) {
      setFoodList(JSON.parse(savedFood));
    } else {
      // 默认食物列表
      setFoodList(["好朋友", "家常菜", "麦当劳", "披萨", "火锅"]);
    }

    // 根据时间设置样式
    const hour = new Date().getHours();
    let className = "";
    if (hour >= 6 && hour < 9) className = styles.earlyMorning;
    else if (hour >= 9 && hour < 11) className = styles.midMorning;
    else if (hour >= 11 && hour < 14) className = styles.lunchTime;
    else if (hour >= 14 && hour < 17) className = styles.afternoon;
    else if (hour >= 17 && hour < 20) className = styles.dinnerTime;
    else className = styles.night;

    setTimeClass(className);
  }, []);

  // 保存到localStorage
  useEffect(() => {
    if (foodList.length > 0) {
      localStorage.setItem("yolo-food", JSON.stringify(foodList));
    }
  }, [foodList]);

  // 添加新食物
  const addFood = () => {
    if (newFood.trim()) {
      setFoodList([...foodList, newFood.trim()]);
      setNewFood("");
    }
  };

  // 删除食物
  const deleteFood = (index: number) => {
    const newList = [...foodList];
    newList.splice(index, 1);
    setFoodList(newList);
  };

  // 随机选择食物
  const pickRandomFood = () => {
    if (foodList.length === 0) {
      alert("请先添加一些食物选项!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * foodList.length);
    alert(`今天吃：${foodList[randomIndex]}`);
  };

  return (
    <div className={`${styles.container} ${timeClass}`}>
      <div className={styles.header}>
        <h1>YOLO 工作室吃什么</h1>
        <p>解决每天最重要的决定 - 午餐吃什么!</p>
      </div>

      <div className={styles.mainContent}>
        <button className={styles.pickButton} onClick={pickRandomFood}>
          YOLO 今天吃什么
        </button>

        <div className={styles.inputGroup}>
          <input
            type="text"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
            placeholder="输入新的食物..."
            onKeyDown={(e) => e.key === "Enter" && addFood()}
          />
          <button onClick={addFood}>添加食物</button>
        </div>

        <button
          className={styles.toggleButton}
          onClick={() => setShowFoodList(!showFoodList)}
        >
          {showFoodList ? "隐藏卡池" : "查看卡池信息"}
        </button>
      </div>

      {showFoodList && (
        <div className={styles.foodListContainer}>
          <h3>当前食物卡池 ({foodList.length})</h3>
          <ul className={styles.foodList}>
            {foodList.map((food, index) => (
              <li key={index}>
                <span>{food}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteFood(index)}
                >
                  删除
                </button>
              </li>
            ))}
          </ul>

          {foodList.length === 0 && (
            <p className={styles.emptyMessage}>食物列表为空，请添加一些选项</p>
          )}
        </div>
      )}

      <div className={styles.footer}>
        <p>数据保存在本地浏览器中 · 每天至少使用一次 😋</p>
      </div>
    </div>
  );
}

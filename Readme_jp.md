## 📌 プロジェクト概要

このプロジェクトは Vite + Vue3 による倉庫番ゲームです。Vue3 Hooks の教育用として始まりましたが、途中からロジックとビューの分離、Vue・React・DOM のマルチ環境対応という設計実験に発展しました。

## 🧠 技術的特徴

- 🎯 ロジックとビューを分離（class + IViewer インターフェース）
- 🏗️ 素の DOM、Vue、React に対応
- 🧩 抽象ファクトリ関数で Viewer を注入
- 🔁 Vue は reactive + computed を活用して自動更新
- 📬 React は useSyncExternalStore + pub-sub により手動更新
- 🎮 ステージ切り替えはカスタム hook で制御
- 🧱 Game / Ruler を TypeScript クラスで実装

## 📁 ディレクトリ構成

```tree
src/
├── skoban/                 # コアロジック（マップ、キャラ、ルールなど）
│   ├── core/               # Game、Ruler などのクラス
│   └── viewers/            # IViewer インターフェースと DOM/Vue/React 実装
├── hooks/                  # カスタムフック（移動、ステージ管理など）
├── views/
│     └──oop/
│         ├── dom           # DOM 実装
│         ├── vue           # Vue 実装（reactive+computed）
│         └── react         # React 実装（ReactDOM 経由）
├── store/                  # ステージデータ
└── utils/                  # ユーティリティ関数（generateMap など）
```

## 🚀 起動方法

```bash
始终显示详情

复制
pnpm install # 依存関係をインストール
pnpm dev # 開発サーバー起動
pnpm build # ビルド
```

## キー操作

方向キーでキャラクターを操作します：↑ ↓ ← →

## 🏗️ 開発メモ

最初は Composition API の教材用でしたが、フレームワークに依存しない設計へ転換しました。

Vue の reactive による this の Proxy 化によって、this の指向性に問題が発生。

React では useSyncExternalStore がクラスインスタンスに対応できず、最終的にプレーンオブジェクトに変換して解決。

DOM 実装が意外と一番シンプルでした。

## 📌 今後の予定

マップエディタ UI

カスタムスキン対応

ステージのエクスポート・インポート / セーブ機能 """

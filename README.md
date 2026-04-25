# practice-next-js
First time with NextJS

## NextJS設定
```bash
> npx create-next-app@latest
√ Would you like to use TypeScript? ... Yes
√ Which linter would you like to use? » ESLint

√ Would you like to use React Compiler? ... No
# この項目をカスタマイズ
# 初回学習において、予期しないコード変更をなくしておきたい

√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? ... Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No
√ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? ... Yes
```

## 参考動画
shincodeさんの解説は、初めてライブラリを触る人からある程度使える人まで、幅広く参考になります。

※ 2022年時点の動画ですが、ほとんどの部分が今のnext.jsでも通用します。（2026/04時点）
※ こちらの動画は PageRouter 方式を採用していますが、このポートフォリオでは AppRouter 方式を採用しています。

<a href="https://youtu.be/eEP7CLqnRr0?si=m-BKihckmQUYj8rT&t=90" align="center">
  <img
    src="https://img.youtube.com/vi/eEP7CLqnRr0/maxresdefault.jpg"
    alt="YouTube movie"
    height="120"
  />
</a>

## 学習履歴
**2026/04/19**
* next-jsのインストール
* 基本的な仕組みの学習
* ルーティング仕様を確認
* 主要コンポーネントを移植（データはモック化）

**2026/04/20**
* projectドメインのUIを移植
* useRouterの param提供 を学習

**2026/04/21**
* AppRouter と PageRouter の違いを学習中

**2026/04/22**
* レンダリングパターンについての基礎理解
* PrismaによるSupabaseとの同期を完了

**2026/04/23**
* AppRouter版のディレクトリ構造を間違えていたため修正
* AppRouter版のparams取得方法を間違えていたため修正
* NextResponseの基本的な使い方を学習
* PrismaClientの使い方を再学習
* pinoを初導入

**2026/04/24**
* PrismaのQueryHandlerの作成と記事へのアウトプット

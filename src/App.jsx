import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import {
  Pomodoro,
  MarkdownEditor,
  BrowserTabs,
  RockPaperScissors,
  CanvasGame,
} from "./apps";

const AppList = [
  { path: "/pomodoro", component: Pomodoro },
  { path: "/markdown-editor", component: MarkdownEditor },
  { path: "/browser-tabs", component: BrowserTabs },
  { path: "/rock-paper-scissors", component: RockPaperScissors },
  { path: "/canvas-game", component: CanvasGame },
];

function App() {
  return (
    <BrowserRouter>
      {AppList.map(({ path, component }, idx) => (
        <Link key={path + idx} to={path}>
          {component.name}
        </Link>
      ))}
      <Switch>
        {AppList.map(({ path, component }, idx) => (
          <Route key={path + idx} path={path} component={component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

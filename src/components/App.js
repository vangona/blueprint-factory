import React, { useState } from "react";
import AppRouter from "./Router";

const App = () => {
    const [init, setInit] = useState(false)
    return (
        <AppRouter init={init} />
    )
};
export default App;

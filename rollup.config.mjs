import commonjs from "@rollup/plugin-commonjs";
import { createRequire } from "module";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
const require = createRequire(import.meta.url);
const packageJson = require("./package.json");


export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
];

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState(`n = int(input())\nprint(n * n)`);
  const [language, setLanguage] = useState("python3");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const testCases = [
    { input: "2\n", expected: "4\n" },
    { input: "5\n", expected: "25\n" },
    { input: "10\n", expected: "100\n" },
  ];

  const getDefaultCode = (lang) => {
    switch (lang) {
      case "python3":
        return `n = int(input())
print(n * n)`;
      case "javascript":
        return `// Read input from stdin
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const n = parseInt(input);
  console.log(n * n);
  rl.close();
});`;
      case "cpp":
        return `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << n * n << endl;
    return 0;
}`;
      case "c":
        return `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    printf("%d\\n", n * n);
    return 0;
}`;
      case "java":
        return `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        System.out.println(n * n);
        scanner.close();
    }
}`;
      default:
        return `n = int(input())
print(n * n)`;
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
  };

  const getExtension = (lang) => {
    switch (lang) {
      case "python3":
        return "py";
      case "cpp":
        return "cpp";
      case "javascript":
        return "js";
      case "java":
        return "java";
      case "c":
        return "c";
      default:
        return "txt";
    }
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "python3":
        return python();
      case "cpp":
        return cpp();
      case "javascript":
        return javascript();
      case "c":
        return cpp(); // C++ extension also supports C
      default:
        return python();
    }
  };

  const runTestCases = async () => {
    setLoading(true);
    const newResults = [];

    for (let i = 0; i < testCases.length; i++) {
      const { input, expected } = testCases[i];
      try {
        const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
          language: language,
          version: "*", // use latest version
          files: [
            {
              name: "main." + getExtension(language),
              content: code,
            },
          ],
          stdin: input,
        });
        console.log(res.data);
        const actualOutput = res.data.run.output || "";
        const passed = actualOutput.trim() === expected.trim();

        newResults.push({
          testCase: i + 1,
          input,
          expected: expected.trim(),
          actual: actualOutput.trim(),
          passed,
        });
      } catch (err) {
        newResults.push({
          testCase: i + 1,
          input,
          expected: expected.trim(),
          actual: "Error",
          passed: false,
        });
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🧪 Online Code Compiler with Test Cases</h2>

      <label>
        Select Language: &nbsp;
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="python3">Python 3</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="c">C</option>
        </select>
      </label>

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <CodeMirror
          value={code}
          height="200px"
          extensions={[getLanguageExtension(language)]}
          onChange={(value) => setCode(value)}
        />
      </div>

      <button onClick={runTestCases} disabled={loading}>
        {loading ? "Running..." : "Run Test Cases"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h3>Results:</h3>
        {results.map((res, index) => (
          <div
            key={index}
            style={{
              background: res.passed ? "#d4edda" : "#f8d7da",
              padding: "0.8rem",
              marginBottom: "0.5rem",
              borderRadius: "8px",
            }}
          >
            <strong>Test Case {res.testCase}</strong>
            <br />
            <strong>Input:</strong> {res.input}
            <br />
            <strong>Expected:</strong> {res.expected}
            <br />
            <strong>Output:</strong> {res.actual}
            <br />
            <strong>Status:</strong>{" "}
            <span
              style={{
                fontWeight: "bold",
                color: res.passed ? "green" : "red",
              }}
            >
              {res.passed ? "Passed ✅" : "Failed ❌"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

# TCL Outline for VS Code

A lightweight **VS Code extension** that provides **outline navigation** (functions & namespaces with nesting) for Tcl scripts — improving productivity for engineers working with CAD flows, EDA tooling, or Tcl-based automation.

📦 Published on [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=sniryehuda.tcl-vsc-outline)  
⭐ Used by engineers at Intel and beyond to accelerate Tcl workflow navigation.

---

## 🚀 Features
- Adds **symbols view** in the VS Code outline explorer for Tcl `proc` and `namespace` definitions.
- Nested view for easier navigation in complex scripts.
- Compatible with standard Tcl language support extensions.
- Actively improved based on community feedback.

Example:
![Tcl Outline Example](images/screenshot.jpg)

---

## ⚙️ Installation
1. Install [Tcl language support](https://marketplace.visualstudio.com/items?itemName=bitwisecook.tcl) in VS Code.  
2. Search **“Tcl Outline”** in the VS Code Marketplace or [click here](https://marketplace.visualstudio.com/items?itemName=sniryehuda.tcl-vsc-outline).  
3. Reload VS Code and start coding in Tcl.

---

## 📝 Known Issues
- `proc` block may close early if there is a string containing multiple `}` characters.  
- Currently requires a Tcl language extension installed.  
- Cursor context highlighting is limited to symbol declarations.

---

## 📦 Release Notes
### [0.0.3]
- Improved regex to catch more `proc` types.  
- Fixed curly-bracket block alignment (empty procs supported).  

[Full changelog](CHANGELOG.md)

---

## 🤝 Contributing
Issues and PRs are welcome!  
👉 [Open an issue](https://github.com/snirye/tcl_outline_vscode/issues) or reach out: **sniryehud@gmail.com**

---

## 🙏 Acknowledgements
Inspired by [Perl Outline extension](https://github.com/hitode909/vscode-perl-outline).  
Dedicated to the great Tclers **Yoram** and **Ofer**.

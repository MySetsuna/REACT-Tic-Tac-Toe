# 用TypeScript来写React官方入门教程

## .tsx后缀文件，同时入门typescript和React

### 1. 项目说明：
 - 这是React官网上那个下井字棋的入门教程，但是我把它换了typescirpt的语法来写，即.tsx后缀文件的语法。
 - 此外，我还要进一步实现React官方教程上提出的拓展问题
    - react官网教程地址<https://zh-hans.reactjs.org/tutorial/tutorial.html>
    官网上未实现的拓展问题：（✔为该项目中已实现）
    ##### ✔ 1. 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
    ##### ✔ 2. 在历史记录列表中加粗显示当前选择的项目。
    ##### ✔ 3. 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
    ##### ✔ 4. 添加一个可以升序或降序显示历史记录的按钮。
    ##### ✔ 5. 每当有人获胜时，高亮显示连成一线的 3 颗棋子。
    ##### ✔ 6. 当无人获胜时，显示一个平局的消息。
    
 - 作者本人也是刚入门学习，不足之处欢迎指出，一起交流进步
 - 遇到的问题和困惑
    - 在实现第三步的过程中，我发现想要在react中进行for循环有些不太方便，于是我使用以下方法进行处理。
    - 个人感觉 像这样的情况，数组中的值是无意义的，用fori循环更加符合逻辑。目前我只想到这个稍微好看点的写法，不知道各位有没有更优雅的实现方式吗？
    ````tsx
   class Board extends Component<{ squares: string[],onClick:any}> {
       renderSquare(i: number) {
           return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
       }
       render() {
           return (<div>
               {
                   Array(3).fill(null).map((number,index)=>{
                       return (<div key={index} className="board-row">
                           {
                               [index*3,index*3+1,index*3+2].map((number,index)=>{
                                   return this.renderSquare(number)
                               })
                           }
                       </div>)
   
                   })
               }
           </div>)
       }
   }
   ````

## 效果展示
   - 这个项目目前被我部署在heroku的免费服务上<https://jxk2g1.herokuapp.com/>
   - github地址<https://github.com/MySetsuna/REACT-Tic-Tac-Toe>
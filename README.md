# handle-helper
“汉兜”成语游戏解谜工具
## 运行方式
```
pnpm install
pnpm start
```
## 命令
运行后会让你输入筛选命令，有以下三种命令:<br>
`l 位置 筛选条件`用于筛选指定位置的字的拼音符合筛选条件的成语<br>
`r 位置 筛选条件`用于排除指定位置的字的拼音符合筛选条件的成语<br>
`i 筛选条件`用于筛选在某个位置的字的拼音符合筛选条件的成语<br>
其中位置表示成语中字的位置1，2，3，4<br>
<br>
筛选条件可以是:<br>
- 全拼+声调 `ping1` <br>
- 全拼 `ping` <br>
- 声母 `p` <br>
- 韵母 `ing` <br>
- 声调如第一声 `1` <br>
## 例子
已知成语第二个字的拼音声母是f<br>
命令：`l 2 f` <br>
已知成语第三个字的声调不是第二声<br>
命令：`r 3 2` <br> 
已知成语中某个字的韵母是a<br>
命令：`i a` <br> 

## 图示
![](example.png)

# handle-helper
"Handou" Idiom Game Puzzle-Solving Tool

## How to Run
```
pnpm install
pnpm start
```

## Commands
Once running, you'll be prompted to enter filter commands. There are three types of commands:

- `l position filter_condition` to filter idioms where the character at the specified position matches the filter condition based on its pinyin.
- `r position filter_condition` to exclude idioms where the character at the specified position matches the filter condition based on its pinyin.
- `i filter_condition` to filter idioms where any character at a position matches the filter condition based on its pinyin.

Here, *position* represents the position of the character in the idiom (1, 2, 3, or 4).

### Filter Conditions
Filter conditions can be:
- Full pinyin + tone (e.g., `ping1`)
- Full pinyin (e.g., `ping`)
- Initial consonant (e.g., `p`)
- Final vowel (e.g., `ing`)
- Tone only (e.g., first tone `1`)

### Examples
- If you know the second character's pinyin initial consonant is "f":  
  Command: `l 2 f`
  
- If you know the third character's tone is not the second tone:  
  Command: `r 3 2`
  
- If you know one character in the idiom has the final vowel "a":  
  Command: `i a`
### Illustration
![](example.png)


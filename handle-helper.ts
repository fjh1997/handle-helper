import * as readline from 'readline';
import IdiomsRaw from 'data/idioms.txt?raw'
import fs from 'fs';
import { getPinyinRaw, toSimplified } from 'packages/tools/src/index.ts'
import PolyphonesRaw from 'data/polyphones.json'

export const IdiomsList = IdiomsRaw.split('\n').map(i => i.trim()).filter(Boolean)
export const Polyphones = PolyphonesRaw as Record<string, string>

export function getIdiom(word: string): [string, string | undefined] | undefined {
  const simplified = toSimplified(word)
  if (Polyphones[word])
    return [word, Polyphones[word]]
  if (Polyphones[simplified])
    return [word, Polyphones[simplified]]
  if (IdiomsList.includes(word))
    return [word, undefined]
  if (IdiomsList.includes(simplified))
    return [simplified, undefined]
  return undefined
}

export function getPinyin(word: string) {
  const data = getIdiom(word)
  const parts = data?.[1]
    ? data[1].split(/\s+/g)
    : getPinyinRaw(data?.[0] || toSimplified(word), { style: getPinyinRaw.STYLE_TONE2 }).map(i => i[0])
  // https://baike.baidu.com/item/%E6%B1%89%E8%AF%AD%E6%8B%BC%E9%9F%B3%E6%96%B9%E6%A1%88/1884432
  return parts.map(i => i
    .replace(/^(y|j|q|x)u([a-z]*[0-9]?)$/g, '$1v$2'),
  )
}




const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pinyinInitials = 'b p m f d t n l g k h j q r x w y zh ch sh z c s'.split(' ');
function judge(pinyinfull,filter){
const tone = pinyinfull.match(/[\d]$/)?.[0] || ''
let pinyin=pinyinfull
if (tone){
     pinyin = pinyinfull.slice(0, -tone.length).trim()
}
let rest = pinyin
const shengmu = pinyinInitials.find(i => rest.startsWith(i))
if(shengmu)
      rest = rest.slice(shengmu.length)
return filter === tone||filter === shengmu||filter === rest||filter==pinyin||filter==pinyinfull

}


async function input(data){

    console.log(data)
    rl.question('please input command: ', (answer) => {
        let command=answer.toLowerCase().split(" ")[0]
        let location=answer.toLowerCase().split(" ")[1]
        let filter=answer.toLowerCase().split(" ")[2]
        let result 
        switch(command) {
        case 'l':
            console.log('locate!');
             result = data.filter((chengyu) => judge(chengyu.pinyin[location -1],filter) );
            console.log(result)
            input(result)
            break;
        case 'r':
            console.log('remove!');
            result = data.filter((chengyu) => !judge(chengyu.pinyin[location -1],filter) );
            console.log(result)
            input(result)
            break;
        default:
            console.log('Invalid command!');
            input(data)
        }
    });
}

fs.readFile("db.json", "utf8",async (err, data) => {
    if (err) {
        if (err.code === "ENOENT") {
            console.error("File not found:", err.path);
            const IdiomsList = IdiomsRaw.split('\n').map(i => i.trim()).filter(Boolean)
            let dict = []
            IdiomsList.forEach(element => {
                let chengyu = { word: "", pinyin: [] }
                chengyu.word = element
                chengyu.pinyin = getPinyin(element)
                dict.push(chengyu)
            });
            let db = JSON.stringify(dict);
           await fs.writeFile('db.json', db, (err) => {
                if (err) {
                    console.log('Error writing file:', err);
                } else {
                    console.log('Successfully wrote file');

                    input(dict);
                }
            });
        } else {
            console.error("Error reading file:", err);
            
        }
    }
    else{
    let words = JSON.parse(data);
    input(words);
    }
});




var a = 12121;



var asyncReadFile = async function () {
    const f1 = await setTimeout(()=> {
        console.log(1111);
        return "aaa";
    },3000)
    const f2 = await setTimeout(()=> {
        console.log(222);
        return "bbb";
    },3000)
    console.log(f1);
    console.log(f2);
};
asyncReadFile();
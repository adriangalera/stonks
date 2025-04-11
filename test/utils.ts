export const printData = (data: any) => {
    let r = []
    for (let d of data) {
        r.push(d)
    }
    console.log(JSON.stringify(r))
}
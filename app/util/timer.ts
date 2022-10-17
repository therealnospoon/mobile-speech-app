export const countdown = (func?:any, timelimit?:number) => {
    const timeout = setTimeout(func, (timelimit * 1000));
        
    return timeout;
};

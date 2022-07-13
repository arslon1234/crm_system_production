export const getUsers = async page => {
       const data = await (
         await fetch(`finance/income/?page=${page}`)
       ).json();
       return data.results;
};
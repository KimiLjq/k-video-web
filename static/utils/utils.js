export default {
  getFormatTime(data) {
    let yy = data.getFullYear();
    let mm = data.getMonth()+1;
    let dd = data.getDate();
    let hh = data.getHours();
    let mf = data.getMinutes()<10 ? '0' + data.getMinutes() : data.getMinutes();
    let ss = data.getSeconds()<10 ? '0' + data.getSeconds() : data.getSeconds();

    return yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
  }
}

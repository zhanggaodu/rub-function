
function fn() {
  new Promise(() => {
    postMessage({
      type: "debug",
      message: '2222'
    })
  })
}
onmessage = function (e) {
  // 收到
  console.log('main...js', e.data)
  fn()
  // post
}
// postMessage({
//   type: "debug",
//   message: '2222'
// })
// onconnect = function (e) {
//   console.log(e)
//   var port = e.ports[0];
//   port.addEventListener('message', function (e) {
//     var workerResult = 'connect: ' + (e.data[0]);
//     port.postMessage(workerResult);
//   });
//   port.start();
// }
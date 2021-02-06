require('yargs')
  .usage('$0 <cmd> [args]')
  .command('area [type]', "calc area", (yargs) => 
  {
    yargs.positional('type', {
      type: 'string',
      default: 'rect',
      describe: 'The type of shape to calculate area.'
    })
    .option("w", {
      describe: "The width of the area.",
      type: "number"
    })
    .option("h", {
      describe: "The height of the area.",
      type: "number"
    })
    .option("r", {
      describe: "The radius of the area.",
      type: "number"
    })
    .option("v", {
      type: "boolean"
    })
  }, function (argv) {  calc(argv) } )
  .help()
  .argv

function calc(argv) {
  // Unpack into variables
  let {w,h,r,v,type} = argv;
  if( v == true){
    for (var i=0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
  }
  if( type == "rect") {
    console.log( `Area: ${w * h}`);
  }else if(type == "circle"){
    console.log( `Area of circle: ${Math.PI* r * r}`);
  }
}
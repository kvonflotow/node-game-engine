const imageToAscii = require( 'image-to-ascii' )


function drawLine( line, index, timestamp )
{
	process.stdout.cursorTo( 0, index )
	process.stdout.clearLine()
  process.stdout.write( line )
}

function render( data, timestamp )
{
  let timer = setTimeout( () =>
    {
      // console.error( new Error( 'thread timeout' ) )

      process.exit()
    },

    // thread timeout
    1500
  )

  imageToAscii( data, ( err, converted ) =>
    {
      // should we ignore the error instead?
      // or write to a custom console?
      if ( err ) throw err

      process && process.send( [ ( converted.split( '\n' ) || [] ), timestamp ] )

      clearTimeout( timer )

      // ;( converted.split( '\n' ) || [] ).forEach( ( line, index ) => drawLine( line, index, timestamp ) )
    }
  )
}

process.on( 'message', ( [ data, timestamp ] ) =>
  {
    render( Buffer.from( data ), timestamp )
  }
)
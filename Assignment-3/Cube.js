//---------------------------------------------------------------------------
//
//  --- Cube.js ---
//
//    A simple, encapsulated Cone object
const DefaultNumSides = 6;

function Cube( gl, numSides, vertexShaderId, fragmentShaderId ) {
    const vertShdr = vertexShaderId || "Cube-vertex-shader";
    const fragShdr = fragmentShaderId || "Cube-fragment-shader";

    const shaderProgram = initShaders( gl, vertShdr, fragShdr );
    if ( shaderProgram < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return;
    }

    let positions = [
        0, 0, 0, // 0 origin
        1, 0, 0, // 1
        1, 1, 0, // 2
        0, 1, 0, // 3
        0, 0, 1, // 4
        1, 0, 1, // 5
        1, 1, 1, // 6
        0, 1, 1  // 7
    ]

    let indices = [
        4, 6, 7,      4, 5, 6,    // Front face
        1, 0, 3,      1, 3, 2,    // Back face
        7, 6, 2,      7, 2, 3,    // Top face
        5, 0, 1,      5, 4, 0,    // Bottom face
        5, 2, 6,      5, 1, 2,    // Right face
        4, 7, 0,      0, 7, 3,    // Left face
    ];

    aPosition = new Attribute(gl, shaderProgram, positions, "aPosition", 3, gl.FLOAT );

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, shaderProgram, "MV");
    let P  = new Uniform(gl, shaderProgram, "P");

    this.render = function () {
        gl.useProgram( shaderProgram );
        MV.update(this.MV);
        P.update(this.P);

        aPosition.enable();

        indices.enable();

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        // gl.bindBuffer(gl.arrayBuffer(), this.positions.buffer);
        // gl.vertexAttribPointer(this.positions.attributeLoc, this.positions.numComponents, gl.FLOAT, 0 ,0);

        indices.disable();
        aPosition.disable();

    }
}

#version 400

layout (location = 0) in vec3 vPos;

uniform vec3 uCameraPos;
uniform float uSize;
uniform vec3 uOffset;
uniform vec4 uColor;
uniform mat4 uVP;

out vec4 color;
out vec2 uv;

void main()
{
   color = uColor;
   uv = vPos.xy;

   vec3 center = vPos + vec3(-0.5, -0.5, 0);
   center.xyz = center.xyz * uSize;
   vec3 norm = normalize(uCameraPos-center);

   vec3 x = cross(vec3(0,1,0), norm);
   vec3 y = cross(norm, normalize(x));
   vec3 z = norm;
   mat3 matr = mat3(normalize(x), normalize(y), z);

   gl_Position = uVP * vec4(matr * center + uOffset, 1.0); 
 
}

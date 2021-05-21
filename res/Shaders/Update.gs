#version 330 core
layout (points) in;
layout (points,max_vertices = 10) out;

in float Type0[];
in vec3 Position0[];
in vec3 Velocity0[];
in float Age0[];
in float Alpha0[];
in float Size0[];
in float Life0[];

out float Type1;
out vec3 Position1;
out vec3 Velocity1;
out float Age1;
out float Alpha1;
out float Size1;
out float Life1;

uniform float gDeltaTimeMillis;
uniform float gTime;
uniform sampler1D gRandomTexture;
uniform float MAX_LIFE;
uniform float MIN_LIFE;
uniform vec3 MAX_VELOC;
uniform vec3 MIN_VELOC;
uniform float r;

#define PARTICLE_TYPE_LAUNCHER 0.0f
#define PARTICLE_TYPE_SHELL 1.0f

vec3 GetRandomDir(float TexCoord)
{
	vec3 Dir = texture(gRandomTexture,TexCoord).xyz;
	Dir -= vec3(0.5,0.5,0.5);
	return Dir;
}

vec3 Rand(float TexCoord){
    vec3 ret = texture(gRandomTexture,TexCoord).xyz;
    return ret; 
}

void main()
{
    float Age = Age0[0] - gDeltaTimeMillis;
	if(Type0[0] == PARTICLE_TYPE_LAUNCHER){
        if(Age <= 0 ){
            Type1 = PARTICLE_TYPE_SHELL;
            Position1 = Position0[0];
            Velocity1 = (MAX_VELOC-MIN_VELOC)*Rand(Age0[0]).x+MIN_VELOC;
            Age1 = (MAX_LIFE-MIN_LIFE)*Rand(Age0[0]).y + MIN_LIFE;
            float dist = sqrt(Position1.x*Position1.x + Position1.z*Position1.z);
			if(dist <= r) Age1 *= 1.3;
            Life1 = Age1;
            Alpha1 = Alpha0[0];
            Size1 = Size0[0];
            EmitVertex();
            EndPrimitive();
            Age = (MAX_LIFE-MIN_LIFE)*Rand(Age0[0]).z + MIN_LIFE;
        }
        Type1 = PARTICLE_TYPE_LAUNCHER;
        Position1 = Position0[0];
        Velocity1 = Velocity0[0];
        Age1 = Age;
        Alpha1 = Alpha0[0];
        Size1 = Size0[0];
        Life1 = Life0[0];
        EmitVertex();
        EndPrimitive();
      }
    else{
        if(Age >= 0){
            float DeltaTimeSecs = gDeltaTimeMillis/1000.0f;
            vec3 DeltaP = Velocity0[0]*DeltaTimeSecs;
			vec3 DeltaV = DeltaTimeSecs*vec3(0.0,1.0,0.0);
            Type1 = PARTICLE_TYPE_SHELL;
            Position1 = Position0[0] + DeltaP;
            Velocity1 = Velocity0[0] + DeltaV;
            Age1 = Age;
            Life1 = Life0[0];
            float factor = 1.0f/((Age/1000.0f - Life1/2000.0f)*(Age/1000.0f - Life1/2000.0f)+1);
            Alpha1 = factor;
            Size1 = 55.0*factor;
            EmitVertex();
            EndPrimitive();
        }
    }
}

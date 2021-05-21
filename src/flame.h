#pragma once
#include <GL/glew.h>
#include <iostream>
#include <ctime>
#include <math.h>
#include <glm/glm.hpp>
#include "Camera.h"
#include "texture.h"
#include "shader.h"

namespace Flame {
#define PARTICLE_TYPE_LAUNCHER 0.0f
#define PARTICLE_TYPE_SHELL 1.0f

#define MAX_VELOC glm::vec3(0.0,5.0,0.0)
#define MIN_VELOC glm::vec3(0.0,3.0,0.0)
#define DEL_VELOC glm::vec3(0.0,2.0,0.0)
#define MAX_LIFE 2.0f*1000
#define MIN_LIFE 1.0f*1000  
#define INIT_SIZE 30.0f;

	const int MAX_PARTICLES = 18000;
	const int INIT_PARTICLES = 10000;
	const glm::vec3 center(0.0f);
	const float r = 0.3f;

	struct FlameParticle
	{
		float type;
		glm::vec3 position;
		glm::vec3 velocity;
		float lifetimeMills;
		float alpha;
		float size;
		float life;
	};

	class Flame
	{
	public:
		Flame();
		~Flame();
		void Render(float frametimeMills, glm::mat4& worldMatrix, glm::mat4 viewMatrix, glm::mat4& projectMatrix);
	
	private:
		bool InitFlame(glm::vec3& pos);
		void UpdateParticles(float frametimeMills);
		void InitRandomTexture(unsigned int size);
		void RenderParticles(glm::mat4& worldMatrix, glm::mat4& viewMatrix, glm::mat4& projectMatrix);
		void GenInitLocation(FlameParticle partciles[], int nums);

		unsigned int mCurVBOIndex, mCurTransformFeedbackIndex;
		GLuint mParticleBuffers[2]; 
		GLuint mParticleArrays[2];
		GLuint mTransformFeedbacks[2];
		GLuint mRandomTexture;
		CTexture mSparkTexture;
		CTexture mStartTexture;
		float mTimer;
		bool mFirst;
		Shader* mUpdateShader;
		Shader* mRenderShader;
	};

}
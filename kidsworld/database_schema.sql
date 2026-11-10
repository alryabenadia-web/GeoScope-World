-- Geography Learning Application - PostgreSQL Schema
-- Run this script on your PostgreSQL server to set up the database

-- Create ENUM types
CREATE TYPE role_enum AS ENUM ('CHILD', 'PARENT');
CREATE TYPE difficulty_enum AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role role_enum NOT NULL DEFAULT 'CHILD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(255) NOT NULL,
  avatar_style JSONB,
  language_preference VARCHAR(10) NOT NULL DEFAULT 'en',
  total_points INT NOT NULL DEFAULT 0,
  parent_email VARCHAR(255),
  is_parent BOOLEAN NOT NULL DEFAULT false,
  child_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Refresh tokens table
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  capital_en VARCHAR(255) NOT NULL,
  capital_ar VARCHAR(255) NOT NULL,
  continent VARCHAR(50) NOT NULL,
  population BIGINT,
  area BIGINT,
  flag_emoji VARCHAR(10),
  flag_url TEXT,
  map_url TEXT,
  landmark_url TEXT,
  image_url TEXT,
  description_en TEXT,
  description_ar TEXT,
  fun_facts_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  fun_facts_ar TEXT[] DEFAULT ARRAY[]::TEXT[],
  famous_landmarks_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  famous_landmarks_ar TEXT[] DEFAULT ARRAY[]::TEXT[],
  famous_animals_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  famous_animals_ar TEXT[] DEFAULT ARRAY[]::TEXT[],
  famous_foods_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  famous_foods_ar TEXT[] DEFAULT ARRAY[]::TEXT[],
  latitude FLOAT,
  longitude FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  correct_answer VARCHAR(255) NOT NULL,
  options_en TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  options_ar TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  difficulty difficulty_enum NOT NULL DEFAULT 'EASY',
  points INT NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Quiz attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  answer VARCHAR(255) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  points_earned INT NOT NULL DEFAULT 0,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Visited countries table
CREATE TABLE IF NOT EXISTS visited_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, country_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(255) NOT NULL,
  criteria JSONB NOT NULL,
  points INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_is_parent ON profiles(is_parent);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

CREATE INDEX IF NOT EXISTS idx_countries_code ON countries(code);
CREATE INDEX IF NOT EXISTS idx_countries_continent ON countries(continent);
CREATE INDEX IF NOT EXISTS idx_countries_created_at ON countries(created_at);

CREATE INDEX IF NOT EXISTS idx_quizzes_country_id ON quizzes(country_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_difficulty ON quizzes(difficulty);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_attempted_at ON quiz_attempts(attempted_at);

CREATE INDEX IF NOT EXISTS idx_visited_countries_user_id ON visited_countries(user_id);
CREATE INDEX IF NOT EXISTS idx_visited_countries_country_id ON visited_countries(country_id);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to users
CREATE TRIGGER users_updated_at_trigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply updated_at trigger to profiles
CREATE TRIGGER profiles_updated_at_trigger
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Confirm schema creation
SELECT 'Database schema created successfully!' AS status;

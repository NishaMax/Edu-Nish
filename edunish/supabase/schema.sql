-- ============================================
-- EduNish Database Schema (Supabase PostgreSQL)
-- ============================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,             -- "mathematics", "ict", etc.
  name_en TEXT NOT NULL,                  -- "Mathematics"
  name_si TEXT NOT NULL,                  -- "ගණිතය"
  name_ta TEXT NOT NULL,                  -- "கணிதம்"
  exam_type TEXT NOT NULL CHECK (exam_type IN ('ol', 'al')),
  stream TEXT,                            -- "maths", "bio", "commerce", "tech", "arts", "common"
  basket TEXT,                            -- "core", "basket-1", "basket-2", "basket-3"
  icon TEXT,                              -- Emoji or icon identifier
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Papers table (metadata only, files hosted on Google Drive)
CREATE TABLE IF NOT EXISTS papers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_slug TEXT NOT NULL,             -- "ict", "mathematics", etc.
  exam TEXT NOT NULL CHECK (exam IN ('ol', 'al')),
  year INT NOT NULL CHECK (year >= 2000 AND year <= 2035),
  medium TEXT NOT NULL CHECK (medium IN ('si', 'en', 'ta')),
  paper_type TEXT NOT NULL CHECK (paper_type IN ('past-paper', 'model-paper', 'marking-scheme', 'notes')),
  drive_url TEXT NOT NULL,                -- Original Google Drive share URL
  direct_url TEXT NOT NULL,               -- Converted direct download URL (drive.google.com/uc?export=download&id=...)
  title_en TEXT,                          -- Optional title override
  downloads INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Prevent duplicate entries
  UNIQUE(subject_slug, exam, year, medium, paper_type)
);

-- 4. Student Paper Requests table
CREATE TABLE IF NOT EXISTS requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_text TEXT NOT NULL,
  year INT,
  medium TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Indexes for High Speed (Sub-millisecond lookups)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_papers_lookup ON papers(exam, subject_slug, year, medium);
CREATE INDEX IF NOT EXISTS idx_papers_type ON papers(paper_type);
CREATE INDEX IF NOT EXISTS idx_papers_published ON papers(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_papers_downloads ON papers(downloads DESC);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can read subjects" ON subjects;
DROP POLICY IF EXISTS "Public can read published papers" ON papers;
DROP POLICY IF EXISTS "Public can insert requests" ON requests;
DROP POLICY IF EXISTS "Allow service role full access to papers" ON papers;
DROP POLICY IF EXISTS "Allow service role full access to subjects" ON subjects;
DROP POLICY IF EXISTS "Allow service role full access to requests" ON requests;

-- Public can read subjects and published papers
CREATE POLICY "Public can read subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Public can read published papers" ON papers FOR SELECT USING (is_published = true);

-- Public can submit missing paper requests
CREATE POLICY "Public can insert requests" ON requests FOR INSERT WITH CHECK (true);

-- Allow authenticated/service role full write access
CREATE POLICY "Allow service role full access to papers" ON papers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access to subjects" ON subjects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access to requests" ON requests FOR ALL USING (true) WITH CHECK (true);

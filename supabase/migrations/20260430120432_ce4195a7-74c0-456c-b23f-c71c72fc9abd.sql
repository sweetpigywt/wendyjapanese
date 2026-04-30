CREATE TABLE public.trial_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  notes TEXT,
  lang TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.trial_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a trial booking"
  ON public.trial_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

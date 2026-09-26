import React from 'react';
import Image from 'next/image';
import { IWorkout } from '@/types/WorkoutTypes';
import Link from 'next/link';
import { WorkoutActions } from '@/components/workout/WorkoutActions';

interface ExerciseDetailsProps {
    params: Promise<
        {
            id: string
        }
    >
}

const getWorkout = async (id: string): Promise<IWorkout | null> => {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch workout data!");
  }

  return res.json();
}

const ExerciseDetails = async ({ params, }: ExerciseDetailsProps) => {
  const { id } = await params;
  const workout = await getWorkout(id);
    if (!workout) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold">
                    Workout Not Found
                </h1>


                <p className="mt-3 text-gray-500">
                    We couldn&apos;t find &quot;{id}&quot;.
                </p>

                <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[9px] bg-[#baff00] px-6 text-sm font-semibold text-black transition hover:bg-[#c7ff33] mt-6"
                >
                    Back to Workouts
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            {/* IMAGE */}
            <div className="relative aspect-square overflow-hidden rounded-[14px] lg:aspect-auto lg:min-h-[730px]">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col">

                {/* TITLE */}
                <h1 className="text-[32px] font-black uppercase leading-none tracking-[-0.04em] md:text-[38px]">
                    {workout.name}
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 max-w-[590px] text-[15px] leading-[1.55] text-zinc-400">
                    {workout.description}
                </p>

                {/* MUSCLE GROUPS */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="rounded-full bg-[#baff00] px-4 py-1 text-xs font-bold text-black"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* DETAILS */}
                <div className="mt-7 overflow-hidden rounded-[14px] border border-zinc-800 bg-[#151820]">

                    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                        <span className="text-xs font-bold text-zinc-500">
                            EQUIPMENT
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {workout.equipment}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                        <span className="text-xs font-bold text-zinc-500">
                            DIFFICULTY
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {workout.difficulty}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                        <span className="text-xs font-bold text-zinc-500">
                            SETS
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {workout.sets}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                        <span className="text-xs font-bold text-zinc-500">
                            REPS
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {workout.reps}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                        <span className="text-xs font-bold text-zinc-500">
                            DURATION
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {workout.duration} min
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                        <span className="text-xs font-bold text-zinc-500">
                            CALORIES
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {workout.caloriesBurned} kcal
                        </span>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-xs font-bold text-zinc-500">
                            RATING
                        </span>
                        <span className="text-sm font-semibold text-white">
                            {workout.rating}
                        </span>
                    </div>

                </div>


                {/* INSTRUCTIONS */}
                <div className="mt-8">
                    <h2 className="text-base font-black">
                        INSTRUCTIONS
                    </h2>

                    <ol className="mt-4 space-y-3 text-sm leading-[1.4] text-zinc-300">
                        {workout.instructions.map((instruction, index) => (
                            <li
                                key={index}
                                className="flex gap-3"
                            >
                                <span className="w-[18px] shrink-0 text-white">
                                    {index + 1}.
                                </span>

                                <span>
                                    {instruction}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* ACTIONS */}
                <WorkoutActions workout={workout} />
            </div>
        </div>
    );
};

export default ExerciseDetails;
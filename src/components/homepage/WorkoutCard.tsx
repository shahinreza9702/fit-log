import Image from 'next/image';
import { IWorkout } from '@/types/WorkoutTypes';
import Link from 'next/link';

interface IWorkoutCardProps {
    workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
    return (
        <Link href={`/workout/${workout.id}`} className="block">
            <article className="group overflow-hidden rounded-xl border border-[#292f3a] bg-[#15171d] transition duration-300 hover:-translate-y-1 hover:border-[#c6ff00]/50">

                {/* Image */}
                <div className="relative h-[190px] overflow-hidden">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>

                {/* Card Content */}
                <div className="p-5">

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {workout.muscleGroups.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-[#c6ff00] px-3 py-1 text-[10px] font-black text-black"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-white">
                        {workout.name}
                    </h3>

                    {/* Equipment */}
                    <p className="mt-1 text-xs text-[#777c87]">
                        {workout.equipment}
                    </p>

                    {/* Divider */}
                    <div className="my-4 h-px bg-[#242831]" />

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[11px] text-[#858b96]">
                        <span className="flex items-center gap-1">
                            ◷ {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                            ● {workout.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1">
                            ☆ {workout.rating}
                        </span>
                    </div>

                </div>
            </article>
        </Link>

    );
};

export default WorkoutCard;

import React from 'react';
import WorkoutCard from './WorkoutCard';
import {IWorkout} from '@/types/WorkoutTypes'


const getWorkoutData = async() =>{
    const res = await fetch('http://localhost:3000/data/data.json');
    if(!res.ok){
        throw new Error('Faild to Fetch Workout Data');
    }
     return res.json();
}

const WorkoutGrid = async() => {

    const workoutData = await getWorkoutData();
    return (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {workoutData.map((workout:IWorkout, index:number) => (
                <WorkoutCard key={workout.id ?? index} workout={workout} />
            ))}

        </section>
    );
};

export default WorkoutGrid;
import { CategoryWrapper } from '@/components/category-wrapper';
import { PickOverview } from '@/components/pick-overview';
import { WeekSelector } from '@/components/week-selector';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/picks/$groupId/$year/$week')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const navigate = Route.useNavigate();

  return (
    <div className="container mx-auto flex flex-col gap-4 p-2">
      <WeekSelector
        selectedWeek={Number(params.week)}
        latestAvailableWeek={14}
        onWeekChange={week =>
          navigate({
            to: '/picks/$groupId/$year/$week',
            params: {
              groupId: params.groupId,
              year: params.year,
              week: week.toString(),
            },
          })
        }
      />
      <PickOverview
        picks={{
          favorite: 'locked',
          underdog: 'not-picked',
          total: 'not-picked',
        }}
      />
      <hr />
      <CategoryWrapper category="favorite" pickStatus="locked">
        Some content...
      </CategoryWrapper>
    </div>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

export function DeduplicationGuide() {
  return (
    <div className="mb-8">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="what-is-this">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              이 도구는 무엇인가요?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>
                중복으로 이벤트를 보냈을 때, <strong>Unique Key</strong>를 통해{" "}
                <strong>최대 24시간</strong> 안의 이벤트를 중복 제거하는 기능입니다.
              </p>
              <p className="text-muted-foreground">
                서버단에서 이벤트가 버려지므로 raw_data에도 남지 않습니다.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-to-use">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              사용 방법
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>App ID로 앱 검색</li>
              <li>현재 설정 확인</li>
              <li>Platform 선택 (App/Web)</li>
              <li>이벤트 종류 선택</li>
              <li>중복 제거 윈도우 설정 (기본 86400초 = 24시간)</li>
              <li>생성될 Dedup Key 확인</li>
              <li>적용 버튼 클릭</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dedup-key-syntax">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Dedup Key 문법 (Liquid)
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">함수</th>
                      <th className="text-left py-2">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4">
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                          assert_not_empty
                        </code>
                      </td>
                      <td className="py-2 text-muted-foreground">
                        값이 있음을 보장. 없으면 중복 제거 없이 처리
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">
                        <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                          assert_valid_uuid4
                        </code>
                      </td>
                      <td className="py-2 text-muted-foreground">
                        유효한 UUID4 포맷 보장
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="warnings">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              주의사항
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Install, Deeplink Open</strong> 등 Target Event 중복 제거는
                  권장하지 않습니다.
                </AlertDescription>
              </Alert>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  백오피스에서 지원하지 않는 커스텀 이벤트는{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    #csm-x-backend-req
                  </code>
                  에 요청
                </li>
                <li>
                  문제 발생 시{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    #all-backend
                  </code>
                  에{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    !worker-support
                  </code>{" "}
                  태그
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
